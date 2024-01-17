import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const langCode = window.location.pathname.split('/')[1];
const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/${langCode}/`;
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
            query: () => 'jsonapi/block_content/about_the_university/f97b1379-de32-4696-bd50-7aac5d5ba992?include=field_image',
        }),
        FooterMenu: builder.query({
            query: () => 'entity/menu/footer/tree',
        }),
        FooterPartnersBlock: builder.query({
            query: () => 'jsonapi/block_content/footer_bottom_partners/ae849b0d-8e67-409a-ad71-b63483a35fe8?include=field_partner&jsonapi_include=field_image',
        }),
        FooterInfoBlock: builder.query({
            query: () => 'jsonapi/block_content/about_the_university/ab52a7ef-b55b-4fec-9dc8-c2038c2e8769?include=field_image&jsonapi_include=1',
        }),
        MainSlider: builder.query({
            query: () => 'jsonapi/views/slider/block_1?include=field_image,field_link&jsonapi_include=1',
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
                const {id} = args;
                return `jsonapi/poll_choice/poll_choice/${id}`;
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
            query: () => 'jsonapi/views/actual_news/block_1?include=field_image&jsonapi_include=1',
        }),
        LastNewsSlider: builder.query({
            query: () => 'jsonapi/views/last_news/block_1?include=field_image&jsonapi_include=1',
        }),
        NewsPage: builder.query({
            query: (args) => {
                const {alias} = args;
                return `news/${alias}?_format=json`;
            },
        }),
        EventsSlider: builder.query({
            query: () => 'jsonapi/views/events_coming_soon/block_1?include=field_image&jsonapi_include=1',
        }),
        InfrastructurePage: builder.query({
            query: (args) => {
                const {page} = args;
                return `infrastructure/${page}?_format=json`;
            },
        }),
        Infrastructure: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/views/infrastructure/${endpoint}`;
            },
        }),
        PhotoAlbums: builder.query({
            query: () => 'jsonapi/views/photoalbums_/block_1?include=field_image&jsonapi_include=1',
        }),
        PhotoAlbumsPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `photoalbums/${page}?_format=json`;
            },
        }),
        FacebookBlock: builder.query({
            query: () => 'jsonapi/block_content/block_link/9997e437-90d7-49d1-98c6-d8c11bb4db04',
        }),
        Staff: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/views/administrative_units/${endpoint}?include=field_image&jsonapi_include=1`;
            },
        }),
        StaffPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `staff/${page}?_format=json`;
            },
        }),
        Branches: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/views/branches/${endpoint}?include=field_image&jsonapi_include=1`;
            },
        }),
        BranchesPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `branches-and-representative-offices/${page}?_format=json`;
            },
        }),
        GeneralInfoPage: builder.query({
            query: (args) => {
                const {page} = args;
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
                const {endpoint} = args;
                return `jsonapi/views/academic_publications/${endpoint}`;
            },
        }),
        Node: builder.query({
            query: (args) => {
                const {nid} = args;
                return `node/${nid}?_format=json`;
            },
        }),
        UkraineAboveAllView: builder.query({
            query: () => 'jsonapi/views/ukraine_above_all/page_1?include=field_image&jsonapi_include=1',
        }),
        EnsemblesPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `ensembles/${page}?_format=json`;
            },
        }),
        EnsemblesView: builder.query({
            query: () => 'jsonapi/views/ensembles/block_1?include=field_image&jsonapi_include=1',
        }),
        UniversityRatingView: builder.query({
            query: () => 'jsonapi/views/university_rating/page_1?include=field_image&jsonapi_include=1',
        }),
        DepartmentPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `department/${page}?_format=json`;
            },
        }),
        DepartmentView: builder.query({
            query: (args) => {
                const {id_departments} = args;
                return `jsonapi/views/departments/block_1?views-argument[0]=${id_departments}&include=field_image,field_head_of_department&jsonapi_include=1`;
            },
        }),
        FacultiesView: builder.query({
            query: () => 'jsonapi/views/faculties/page_1?include=field_image&jsonapi_include=1',
        }),
        FacultyPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `faculty/${page}?_format=json`;
            },
        }),
        NewsView: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/views/news/${endpoint}?include=field_image&jsonapi_include=1`;
            },
        }),
        NewsViewFeed: builder.query({
            query: (args) => {
                const {type} = args;
                const {id} = args;
                return `jsonapi/views/news_in_block/${type}?views-argument[0]=${id}`;
            },
        }),
        DynamicPage: builder.query({
            query: (args) => {
                const {types} = args;
                const {alias} = args;
                return `${types}/${alias}?_format=json`;
            },
        }),
        NewsViewBlock: builder.query({
            query: (args) => {
                const {currentPage} = args;
                const {date} = args;
                const {category} = args;
                return `jsonapi/views/news/block_1?page=${currentPage}&views-filter[created]=${date}&views-filter[type_news]=${category}&include=field_image&jsonapi_include=1`;
            },
        }),
        EventViewBlock: builder.query({
            query: (args) => {
                const {date} = args;
                const {category} = args;
                return `jsonapi/views/events/block_1?views-filter[created]=${date}&views-filter[field_type_target_id]=${category}&include=field_image&jsonapi_include=1`;
            },
        }),
        GeneralData: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `general_training_cycle/${endpoint}`;
            },
        }),
        CertificationData: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `certification/${endpoint}`;
            },
        }),
        ProfessionalData: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `professional_training_cycle/${endpoint}`;
            },
        }),
        EducationCatalogPage: builder.query({
            query: (args) => {
                const {page} = args;
                return `educational-programs/${page}?_format=json}`;
            },
        }),
        EducationCatalogView: builder.query({
            query: () => 'jsonapi/views/satalog_of_educational_programs/block_1',
        }),
        EducationView: builder.query({
            query: (args) => {
                const {title} = args;
                const {field_form_educations_value} = args;
                const {field_educational_level_target_id} = args;
                const {field_validity_value} = args;
                const {field_faculty_target_id} = args;
                return `all-educations?views-filter[title]=${title}&views-filter[field_form_educations_value]=${field_form_educations_value}&views-filter[field_educational_level_target_id]=${field_educational_level_target_id}&views-filter[field_validity_value]=${field_validity_value}&views-filter[field_faculty_target_id]=${field_faculty_target_id}`;
            },
        }),
        Educations: builder.query({
            query: () => 'all-educations',
        }),
        TaxonomyTypeInfo: builder.query({
            query: () => 'jsonapi/taxonomy_term/type_information',
        }),
        NewsLetterSubscriber: builder.query({
            query: () => 'admin/content/block/5?_format=json',
        }),
        NewsLetterUnSubscriber: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `entity/simplenews_subscriber/${endpoint}`;
            },
        }),
        SocialLinks: builder.query({
            query: () => 'jsonapi/block_content/social_links/89007644-1c79-4023-9849-2a080761f6ba',
        }),
        EntityData: builder.query({
            query: (args) => {
                const {endpoint} = args;
                return `jsonapi/${endpoint}`;
            },
        }),
        Paragraph: builder.query({
            query: (args) => {
                const {targetId} = args;
                return `entity/paragraph/${targetId}?include=field_image&jsonapi_include=1`;
            },
        }),
        Search: builder.query({
            query: (args) => {
                const {result} = args;
                return `search?search_api_fulltext=${result}`;
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
                const {endpoint} = args;
                return `entity/file/${endpoint}`;
            },
        }),
        Media: builder.query({
            query: (args) => {
                const {endpoint} = args;
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
    useEnsemblesViewQuery,
    useUniversityRatingViewQuery,
    useEnsemblesPageQuery,
    useDepartmentPageQuery,
    useDepartmentViewQuery,
    useParagraphQuery,
    useFacultyPageQuery,
    useNewsViewQuery,
    useNewsViewFeedQuery,
    useDynamicPageQuery,
    useNewsViewBlockQuery,
    useEventViewBlockQuery,
    useEducationsQuery,
    useEducationViewQuery,
    useTaxonomyTypeInfoQuery,
    useEntityDataQuery,
    useGeneralDataQuery,
    useProfessionalDataQuery,
    useCertificationDataQuery,
    useEducationCatalogPageQuery,
    useEducationCatalogViewQuery,
    useNewsLetterSubscriberQuery,
    useNewsLetterUnSubscriberQuery,
    useSocialLinksQuery,
    useSearchQuery,
    useMetaTagsQuery,
    useSiteInfoQuery,
    useMediaQuery,
    useImageQuery,
} = vnuApi;
