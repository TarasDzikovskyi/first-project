import EditNews from "./EditNews";

export default function SingleNews({pub, currentId, setCurrentId}) {

    return (
        <div>
            <div className='d-flex j-content-around user-tr' onClick={() => setCurrentId(pub._id)}>
                <div className='w-20 tr-text'>{pub.name}</div>
                {/*<div className='w-20 tr-text'>{pub.address}</div>*/}
            </div>
            <div>
                {pub.news.map((n) => (
                    <div>
                        <EditNews n={n} currentId={currentId}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
