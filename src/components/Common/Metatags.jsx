import {Helmet} from "react-helmet";
import useDrupalData from "../../services/api.jsx";
import PropTypes from "prop-types";

function Metatags({type , data, viewUrl}){
    const frontUrl = import.meta.env.VITE_FRONTEND_URL;
    const {data: siteInfo} = useDrupalData(`site/info?_format=json`)
    const {data: metatagBlock} = useDrupalData(`jsonapi/metatag_defaults/metatag_defaults/c83d2f3a-7988-4ca5-9200-db72b073bdb2`)
    const description = data?.field_description?.[0]?.summary;
    const metaTitle = data?.title?.[0]?.value;
    const nodeUrl = `${frontUrl}${data?.path?.[0]?.langcode}${data?.path?.[0]?.alias}`;
    const keywords = metatagBlock?.data?.attributes?.tags?.keywords;
    const viewTitle = data?.meta?.title;
    return(
        <>
            <Helmet>
                {type === "view" && viewTitle && siteInfo && (
                    <title>{`${viewTitle} | ${siteInfo.name}`}</title>
                )}

                {type === "content" && metaTitle && siteInfo && (
                    <title>{`${metaTitle} | ${siteInfo.name}`}</title>
                )}

                {siteInfo?.logo && (
                    <link rel={"icon"} type={"image/png"} href={siteInfo?.logo}/>
                )}

                {type !== "view" && type !== "content" && siteInfo && (
                    <title>{`${siteInfo.name} | ${siteInfo.slogan}`}</title>
                )}

                {description && type === "content" && <meta name="description" content={description} />}

                {type === "front" && frontUrl && (
                    <link rel="shortlink" href={frontUrl}/>
                )}
                {type === "front" && frontUrl && keywords && (
                    <meta name="keywords" content={keywords}/>
                )}

                {type === "content" && (
                    <link rel="canonical" href={nodeUrl} />
                )}
                {frontUrl && type === "front" && (
                    <link rel="canonical" href={frontUrl} />
                )}
                {frontUrl && type === "view" && viewUrl && (
                    <link rel="canonical" href={`${frontUrl}${viewUrl}`} />
                )}

            </Helmet>
        </>
    );
}

Metatags.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.arrayOf(
                    PropTypes.shape({
                        value: PropTypes.string,
                    })
                ),
                field_metatags_image: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string,
                    })
                ),
                field_image: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string,
                    })
                ),
                field_description: PropTypes.arrayOf(
                    PropTypes.shape({
                        summary: PropTypes.string,
                    })
                ),
                path: PropTypes.arrayOf(
                    PropTypes.shape({
                        langcode: PropTypes.string,
                        alias: PropTypes.string,
                    })
                ),
            })
        ),
    ]),
    viewUrl: PropTypes.string,
};
export default Metatags