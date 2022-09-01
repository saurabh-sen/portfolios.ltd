import React from 'react'
import { useRouter } from 'next/router';
import Template_1 from '../components/Template/Template_1';

const Slug = () => {
  // TODO AUTHENTICATION SHOW TEMPLATE FILLED WITH ROUTER QUERY CAME FROM PORTFOLIO-CARD FROM YOUR PROFILE

    const router = useRouter();
    const { slug } = router.query;

  return (
    <Template_1 slug={slug} />
  )
}

export default Slug