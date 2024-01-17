import { OpenInNew } from "@mui/icons-material";
import MetaTags from "../../components/Common/MetaTags.jsx";
import {Link, useLocation} from 'react-router-dom';
import './UkraineAboveAll.scss';
import {useUkraineAboveAllViewQuery} from "../../services/api.js";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";


export default function UkraineAboveAll() {
    const { data: data, isFetching } = useUkraineAboveAllViewQuery();
    const location = useLocation();
    const currentPath = location.pathname;
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ UkraineAboveAll: true });} else { setLoadingValue({ UkraineAboveAll: false } )}
    }, [isFetching]);
    return (
        <>
            <MetaTags type={"view"} data={data} viewUrl={currentPath} />
            <div className='ukraine-above-all container'>
                {data?.data?.map((item) => (
                    <div key={item?.id} className='ukraine-above-all__item'>
                        <a href={item?.path?.alias} className='ukraine-above-all__link'>
                            <OpenInNew className={'ukraine-above-all__icon'}/>
                            <img className="albums-card__img"
                                   src={item?.field_image?.image_style_uri?.['news_440x232']}
                                   alt={item?.field_image?.meta?.alt}/>
                            <div className='ukraine-above-all__title'>{item?.title}</div>
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
}
