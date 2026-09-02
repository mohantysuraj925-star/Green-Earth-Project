import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description
}) {

  return (

    <Helmet>

      <title>
        {title} | Green Earth
      </title>

      <meta
        name="description"
        content={description}
      />

      <meta
        property="og:title"
        content={`${title} | Green Earth`}
      />

      <meta
        property="og:description"
        content={description}
      />

    </Helmet>

  );

}
