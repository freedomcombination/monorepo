import { Mutation } from '@fc/lib'
import { getSecret } from '@fc/secrets'
import {
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
  donationId: number,
) => {
  await Mutation.put<CoursePayment, PaymentUpdateInput>(
    'payments',
    donationId,
    {
      status,
      checkoutSessionId: checkoutSessionId as string,
      ...(status === 'paid'
        ? { paymentDatetime: new Date().toISOString() }
        : {}),
    },
    getSecret('TOKEN'),
  )

  // handle mail stuff with strapi
}

const handleDonation = async (
  status: string,
  checkoutSessionId: string,
  donationId: number,
) => {
  // Update donation status and stripe fields in database
  await Mutation.put<Donation, DonationUpdateInput>(
    'donates',
    donationId,
    {
      status,
      checkoutSessionId: checkoutSessionId as string,
    },
    getSecret('TOKEN'),
  )
  // Send email to customer
  if (status === 'paid') {
    await Mutation.post(
      `donates/email/${donationId}` as StrapiEndpoint,
      {},
      getSecret('TOKEN'),
    )
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
    const donationId = Number(session.success_url.split('&')[1].slice(3))
    const type: MetaDataType = session.metadata.type

    if (type === 'donation')
      return handleDonation(status, checkoutSessionId, donationId)

    if (type === 'course')
      return handleCoursePayment(status, checkoutSessionId, donationId)
  }
}
