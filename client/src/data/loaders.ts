import qs from "qs";
import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiUrl } from "@/utils/get-strapi-url";

const BASE_URL = getStrapiUrl();
const homePageQuery = qs.stringify({
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
          "blocks.info-block": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
        },
      },
    },
  });

export async function getHomePage(){
    const path = "/api/home-page"; 
    
    const url = new URL(path,BASE_URL);
    url.search = homePageQuery;

    return await fetchAPI(url.href, {method:"GET"});
}

//!getting slug information
const pageBySlugQuery = (slug: string) => qs.stringify(
  {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
          "blocks.info-block": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
        },
      },
    },
  },
);

export async function getPageBySlug(slug: string) {
  const path = "/api/pages";

  const url = new URL(path, BASE_URL);
  url.search = pageBySlugQuery(slug);

  return await fetchAPI(url.href, { method: "GET" });
}

//! query for header and footer
const globalSettingQuery = qs.stringify({
  populate: {
    header: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: true,
        cta: true,
      },
    },
  },
});

export async function getGlobalSettings() {
  const path = "/api/global";
  const url = new URL(path, BASE_URL);
  url.search = globalSettingQuery;
  return fetchAPI(url.href, { method: "GET" });
}