import { 
    useParams,
    useNavigate,
    Link
} from "react-router-dom";
import { 
    useEffect
} from "react";
import {
    useRepos
} from '@/hooks/useRepos';
import Loading from '@/components/Loading';
const RepoList = () => {
    const {id} = useParams();
    console.log(id);
    const navigate = useNavigate();
    // hooks
    const {repos, loading, error} = useRepos(id);
    console.log(repos, loading, error);
    useEffect(() => {
        if (!id.trim()) {
        navigate('/');
        }
    }, [])
    
    if (loading) return <Loading/>
    if (error) return (<>Error: {error}</>)

    return (
        <>
            <h1>RepoList</h1>
            <ul>
            {
                repos.map((repo) => (
                    <li key={repo.id}>
                        <Link to={`/users/${id}/repos/${repo.name}`}>
                            {repo.name}
                        </Link>
                    </li>
                ))
            }
            </ul>
        </> 
    )
}
export default RepoList;