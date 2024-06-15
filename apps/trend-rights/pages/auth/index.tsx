import { GetServerSideProps } from 'next'

const AuthIndexPage = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/auth/login',
      permanent: false,
    },
  }
}

export default AuthIndexPage
