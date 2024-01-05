import { useFooterInfoBlockQuery } from '../../../services/api.js';

export default function FooterInfoBlock() {
    const { data:  footerInfoBlockData } = useFooterInfoBlockQuery();
    return (
        <div>
            {/*<ImageComponent url={footerInfoBlockData?.data?.relationships?.field_image?.data?.meta?.drupal_internal__target_id} alt={'actual_news'} />*/}
            <div>{footerInfoBlockData?.data?.attributes?.field_main_text}</div>
            <div><a
                href={`https://www.google.com/maps/search/${footerInfoBlockData?.data?.attributes?.field_location}`}>{footerInfoBlockData?.data?.attributes?.field_location}</a>
            </div>
            <div><span>e-mail: </span><a
                href={`mailto: ${footerInfoBlockData?.data?.attributes?.field_email}`}>{footerInfoBlockData?.data?.attributes?.field_email}</a>
            </div>
        </div>
    );
}
