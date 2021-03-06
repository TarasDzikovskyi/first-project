import Pub from './Pub'
import 'animate.css'

export default function Pubs({setCurrentId, sortedPubs}) {

    if (!sortedPubs.length) return 'No pubs'

    return (
        <div>
            <div className='align-center mw-80 center-box w-100'>
                {sortedPubs?.map((pub) => (
                    <div key={pub._id} className='center-boxes mb-40 animate__animated animate__zoomIn'>
                        <Pub pub={pub} setCurrentId={setCurrentId}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
