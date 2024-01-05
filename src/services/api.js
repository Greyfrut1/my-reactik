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
        YoutubeBlock: builder.query({
            query: () => 'jsonapi/block_content/block_link/4e904849-61c6-45d4-93de-89539abdf33a',
        }),
        PollResultBlock: builder.query({
            query: () => 'poll-vote-result/rest-export/1',
        }),
        PollBlock: builder.query({
            query: () => 'jsonapi/views/polls/block_1',
        }),
        PollChoiceBlock: builder.query({
            query: (args) => {
                const { id } = args;
                return `/jsonapi/poll_choice/poll_choice/${id}`;
            },
        }),
        PollFormSubmit: builder.mutation({
            query: (formData) => ({
                url: 'poll-vote/post-data',
                method: 'POST',
                body: submitFormData,
            }),
        }),
        ActualNewsBlock: builder.query({
            query: () => '/jsonapi/views/actual_news/block_1?include=field_image',
        }),
        LastNewsBlock: builder.query({
            query: () => 'jsonapi/views/last_news/block_1',
        }),
        NewsPage: builder.query({
            query: (args) => {
                const { alias } = args;
                return `news/${alias}?_format=json`;
            },
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
    usePollResultBlockQuery,
    usePollBlockQuery,
    usePollChoiceBlockQuery,
    usePollFormSubmitMutation,
    useActualNewsBlockQuery,
    useLastNewsBlockQuery,
    useNewsPageQuery,

} = vnuApi;
