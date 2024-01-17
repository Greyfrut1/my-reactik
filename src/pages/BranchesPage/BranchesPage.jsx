import {useParams} from "react-router-dom";
import ContactInformation from "../../components/Common/ContactInformation.jsx";
import Paragraph from "../../components/Paragraph/Paragraph.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import LightBox from "../../components/Image/LightBox.jsx";
import {useBranchesPageQuery, useNodeQuery} from "../../services/api.js";
import './BranchesPage.scss';
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

function BranchesPage(){
    const { alias } = useParams();
    const { data:  branchesPage, isFetching: branchesFetch } =  useBranchesPageQuery({ page: `${alias}`});
    const node_id = branchesPage?.field_reference_to_content?.[0]?.target_id;
    const { data:  photoAlbumsNode, isFetching: nodeFetch } =  useNodeQuery({ nid: `${node_id}`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!nodeFetch || !branchesFetch){setLoadingValue({ BranchesPage: true });
        } else { setLoadingValue({ BranchesPage: false } )}
    }, [nodeFetch, branchesFetch]);
    return (
        <>
            <MetaTags type={"content"} data={branchesPage}/>
            <div className={"branches container"}>
                <div className={"branches-info"}>
                    {branchesPage?.field_image?.[0]?.target_id && (
                        <img className="branches-info__img" src={branchesPage?.field_image?.[0]?.url}
                             alt={branchesPage?.field_image?.[0]?.alt}/>
                    )}
                    <div className={"branches-info__contact"}>
                        <h2 className={"branches-info__contact-title"}>{branchesPage?.title?.[0]?.value}</h2>
                        <ContactInformation data={branchesPage} type={"node"}/>
                    </div>
                </div>
                {branchesPage?.field_reference_to_content?.[0]?.target_id && (
                    <div className={"branches-child-node"}>
                        {branchesPage?.field_reference_to_content?.map(() => (
                            <LightBox data={photoAlbumsNode}/>
                        ))}
                    </div>
                )}
                    <div className={"branches-paragraphs"}>
                        {branchesPage?.field_content?.map((item, index) => (
                            <div className={"section"} key={index}>
                                <Paragraph target_id={item?.target_id}/>
                            </div>
                        ))}
                    </div>
            </div>
        </>

    );
}

export default BranchesPage