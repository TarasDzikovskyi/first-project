import { useSelector} from "react-redux";
import SingleNews from "./SingleNews";
import NewsPage from "./NewsPage";

export default function NewsList({currentId, setCurrentId}) {

    const {pubs} = useSelector((state) => state.pubs)
    console.log(pubs)

    return (
        <div>
            <h1>News</h1>
            {pubs.map((pub) => (
                <div>
                    <SingleNews pub={pub} currentId={currentId} setCurrentId={setCurrentId}/>

                </div>
            ))}


        </div>
    )
}
