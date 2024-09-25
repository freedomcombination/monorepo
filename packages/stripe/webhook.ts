import { getSecret } from '@fc/secrets'
import { mutation } from '@fc/services/common/mutation'
import type {
  CoursePayment,
  Donation,
  DonationUpdateInput,
  PaymentUpdateInput,
  StrapiEndpoint,
} from '@fc/types'

import { MetaDataType } from './types'

const handleCoursePayment = async (
  status: string,
  checkoutSessionId: string,
  paymentId: number,
  token: string,
) => {
  await mutation<CoursePayment, PaymentUpdateInput>({
    endpoint: 'payments',
    method: 'put',
    id: paymentId,
    body: {
      status,
      checkoutSessionId: checkoutSessionId as string,
      ...(status === 'paid'
        ? { paymentDatetime: new Date().toISOString() }
        : {}),
    },
    token,
  })

  // handle mail stuff with strapi
}

const handleDonation = async (
  status: string,
  checkoutSessionId: string,
  donationId: number,
  token: string,
) => {
  // Update donation status and stripe fields in database
  await mutation<Donation, DonationUpdateInput>({
    endpoint: 'donates',
    method: 'put',
    id: donationId,
    body: {
      status,
      checkoutSessionId: checkoutSessionId as string,
    },
    token,
  })

  // Send email to customer
  if (status === 'paid') {
    await mutation({
      endpoint: `donates/email/${donationId}` as StrapiEndpoint,
      method: 'post',
      body: {},
      token,
    })
  }
}

export const donationWebhook = async (event: any) => {
  /*
  export const config = {
    api: {
      bodyParser: false,
    },
  };

  const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  TODO Next.js, 
  by default, *parses incoming data as JSON*. However, 
  Stripe Webhook data needs to be received in *raw* format; 
  otherwise, the constructEvent function will fail. 
  Therefore, when using constructEvent, 
  you need to receive the webhook data in raw format.

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try { 
    TODO ChatGPT strongly advise to use this method to verify the signature.
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
    await donationWebhook(event);
    res.status(200).json({ received: true });
  };  
  */

  // check the checkout session status, if it's paid then update the donation status
  if (event?.data?.object?.object === 'checkout.session') {
    const session = event.data.object
    const status = session.payment_status
    const checkoutSessionId = session.id

    const params = new URLSearchParams(new URL(session.success_url).search)
    const id = params.get('id')
    const donationId = Number(id)
    const type: MetaDataType = session.metadata.type
    const token = (session.metadata.token as string) ?? getSecret('TOKEN')

    if (type === 'donation')
      return handleDonation(status, checkoutSessionId, donationId, token)

    if (type === 'course')
      return handleCoursePayment(status, checkoutSessionId, donationId, token)
  }
}
