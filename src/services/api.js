import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/`;

export const vnuApi = createApi({
    reducerPath: 'vnuApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
    }),

    endpoints: (builder) => ({
        TopHeaderMenu: builder.query({
            query: () => 'jsonapi/menu_items/top-header',
        }),
        HeaderMenu: builder.query({
            query: () => 'entity/menu/main-header-menu/tree',
        }),
        YoutubeBlock: builder.query({
            query: () => 'jsonapi/block_content/video_custom_block/0f766c9d-7a63-41da-bfdc-932052356c9d',
        }),
        FooterMenu: builder.query({
            query: () => 'jsonapi/menu_items/footer',
        }),
        FooterPartnersBlock: builder.query({
            query: () => 'jsonapi/block_content/footer_bottom_partners/ae849b0d-8e67-409a-ad71-b63483a35fe8',
        }),
        FooterDevelopmentByBlock: builder.query({
            query: () => 'jsonapi/block_content/block_link/162874d4-fb9b-4763-9d58-e8634414e40c',
        }),
        FooterInfoBlock: builder.query({
            query: () => 'jsonapi/block_content/about_the_university/ab52a7ef-b55b-4fec-9dc8-c2038c2e8769',
        }),
    }),
});

export const {
    useTopHeaderMenuQuery,
    useHeaderMenuQuery,
    useYoutubeBlockQuery,
    useFooterMenuQuery,
    useFooterPartnersBlockQuery,
    useFooterDevelopmentByBlockQuery,
    useFooterInfoBlockQuery,
} = vnuApi;
