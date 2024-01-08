import { useInfrastructureQuery } from '../../services/api.js';
import InfrastructureView from "../../views/InfrastructureView/InfrastructureView.jsx";

export default function InfrastructurePage() {
    const { data } = useInfrastructureQuery({endpoint: `page_1`});

    return <InfrastructureView title={data?.meta?.title} infrastructureData={data} />;
}