import {Carousel} from "react-bootstrap";
import image1 from '../images/zdanie_samolet_nebo_201319_1920x1080.jpg'
import image2 from '../images/zdanie_truba_zheltyj_197275_1920x1080.jpg'
import image3 from '../images/zdanie_voda_minimalizm_198457_1920x1080.jpg'

export default function MainCarousel({pub}){


    return(
        <div>

            {/*<Carousel>*/}
            {/*    {pubs.map((pub) => (*/}
            {/*        <div key={pub._id}>*/}
            {/*            <div pub={pub.avatar}/>*/}
            {/*        </div>*/}
            {/*    ))}*/}

            {/*</Carousel>*/}

            {/*<h1>Carousel</h1>*/}
            {/*<img src={pub.avatar} alt="" height='400px' width='700px'/>*/}

            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={image1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src={image2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </div>
    )
}
