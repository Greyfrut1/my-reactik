import Lightbox from 'react-lightbox-component';

const LightBoxComponent = () => (
    <div>
        <Lightbox images={
            [
                {
                    src: 'some image url',
                    title: 'image title',
                    description: 'image description'
                }
            ]
        }/>
    </div>
);
export default LightBoxComponent;