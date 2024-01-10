import { OpenInNew } from "@mui/icons-material";
import MetaTags from "../../components/Common/MetaTags.jsx";
import {Link, useLocation} from 'react-router-dom';
import './UkraineAboveAll.scss';
import {useUkraineAboveAllViewQuery} from "../../services/api.js";


export default function UkraineAboveAll() {
    const { data: data } = useUkraineAboveAllViewQuery();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
            <MetaTags type={"view"} data={data} viewUrl={currentPath} />
            <div className='ukraine-above-all container'>
                {data?.data?.map((item) => (
                    <div key={item?.id} className='ukraine-above-all__item'>
                        <Link to={item?.path?.alias} className='ukraine-above-all__link'>
                            <OpenInNew className={'ukraine-above-all__icon'}/>
                            <img className="albums-card__img"
                                   src={item?.field_image?.image_style_uri?.['news_440x232']}
                                   alt={item?.field_image?.meta?.alt}/>
                            <div className='ukraine-above-all__title'>{item?.title}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
