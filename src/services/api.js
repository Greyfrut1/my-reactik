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
        HeaderLogo: builder.query({
            query: () => '/jsonapi/block_content/about_the_university/f97b1379-de32-4696-bd50-7aac5d5ba992?include=field_image',
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
        MainSlider: builder.query({
            query: () => '/jsonapi/views/slider/block_1?include=field_image,field_link&jsonapi_include=1',
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
        LastNewsSlider: builder.query({
            query: () => 'jsonapi/views/last_news/block_1?include=field_image&jsonapi_include=1',
        }),
        NewsPage: builder.query({
            query: (args) => {
                const { alias } = args;
                return `news/${alias}?_format=json`;
            },
        }),
        EventsSlider: builder.query({
            query: () => 'jsonapi/views/events_coming_soon/block_1?include=field_image&jsonapi_include=1',
        }),
        InfrastructurePage: builder.query({
            query: (args) => {
                const { page } = args;
                return `infrastructure/${page}?_format=json`;
            },
        }),
        Infrastructure: builder.query({
            query: (args) => {
                const { endpoint } = args;
                return `jsonapi/views/infrastructure/${endpoint}`;
            },
        }),
        PhotoAlbums: builder.query({
            query: () => 'jsonapi/views/photoalbums_/block_1?include=field_image&jsonapi_include=1',
        }),
        PhotoAlbumsPage: builder.query({
            query: (args) => {
                const { page } = args;
                return `photoalbums/${page}?_format=json`;
            },
        }),
        FacebookBlock: builder.query({
            query: () => 'jsonapi/block_content/block_link/9997e437-90d7-49d1-98c6-d8c11bb4db04',
        }),
        Staff: builder.query({
            query: (args) => {
                const { endpoint } = args;
                return `jsonapi/views/administrative_units/${endpoint}?include=field_image&jsonapi_include=1`;
            },
        }),
        StaffPage: builder.query({
            query: (args) => {
                const { page } = args;
                return `staff/${page}?_format=json`;
            },
        }),
        Branches: builder.query({
            query: (args) => {
                const { endpoint } = args;
                return `/jsonapi/views/branches/${endpoint}?include=field_image&jsonapi_include=1`;
            },
        }),
        BranchesPage: builder.query({
            query: (args) => {
                const { page } = args;
                return `branches-and-representative-offices/${page}?_format=json`;
            },
        }),
        GeneralInfoPage: builder.query({
            query: (args) => {
                const { page } = args;
                return `general-information/${page}?_format=json`;
            },
        }),
        PublicInfo: builder.query({
            query: () => 'public-information',
        }),
        Accreditation: builder.query({
            query: () => 'accreditation',
        }),
        PublicInfoView: builder.query({
            query: (args) => {
                const { endpoint } = args;
                return `jsonapi/views/academic_publications/${endpoint}`;
            },
        }),
        Node: builder.query({
            query: (args) => {
                const { nid } = args;
                return `node/${nid}?_format=json`;
            },
        }),
        UkraineAboveAllView: builder.query({
            query: () => 'jsonapi/views/ukraine_above_all/page_1?include=field_image&jsonapi_include=1',
        }),
        DepartmentPage: builder.query({
            query: (args) => {
                const { page } = args;
                return `department/${page}?_format=json`;
            },
        }),
        FacultiesView: builder.query({
            query: () => 'jsonapi/views/faculties/page_1?include=field_image&jsonapi_include=1',
        }),
        FacultyPage: builder.query({
            query: (args) => {
                const { page } = args;
                return `faculty/${page}?_format=json`;
            },
        }),
        Paragraph: builder.query({
            query: (args) => {
                const { targetId } = args;
                return `entity/paragraph/${targetId}?include=field_image&jsonapi_include=1`;
            },
        }),
        MetaTags: builder.query({
            query: () => 'jsonapi/metatag_defaults/metatag_defaults/c83d2f3a-7988-4ca5-9200-db72b073bdb2',
        }),
        SiteInfo: builder.query({
            query: () => 'site/info?_format=json',
        }),
        Image: builder.query({
            query: (args) => {
                const { endpoint } = args;
                return `entity/file/${endpoint}`;
            },
        }),
        Media: builder.query({
            query: (args) => {
                const { endpoint } = args;
                return `/media/${endpoint}/edit?_format=json`;
            },
        }),
    }),
});

export const {
    useTopHeaderMenuQuery,
    useHeaderMenuQuery,
    useHeaderLogoQuery,
    useYoutubeBlockQuery,
    useFooterMenuQuery,
    useFooterPartnersBlockQuery,
    useFooterDevelopmentByBlockQuery,
    useFooterInfoBlockQuery,
    useMainSliderQuery,
    usePollResultBlockQuery,
    usePollBlockQuery,
    usePollChoiceBlockQuery,
    usePollFormSubmitMutation,
    useActualNewsBlockQuery,
    useLastNewsSliderQuery,
    useNewsPageQuery,
    useEventsSliderQuery,
    useInfrastructurePageQuery,
    useInfrastructureQuery,
    usePhotoAlbumsQuery,
    usePhotoAlbumsPageQuery,
    useFacebookBlockQuery,
    useStaffQuery,
    useStaffPageQuery,
    useBranchesQuery,
    useBranchesPageQuery,
    useGeneralInfoPageQuery,
    usePublicInfoQuery,
    useAccreditationQuery,
    usePublicInfoViewQuery,
    useFacultiesViewQuery,
    useNodeQuery,
    useUkraineAboveAllViewQuery,
    useDepartmentPageQuery,
    useParagraphQuery,
    useMetaTagsQuery,
    useSiteInfoQuery,
    useMediaQuery,
    useImageQuery,
} = vnuApi;
