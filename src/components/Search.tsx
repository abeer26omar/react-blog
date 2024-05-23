import { Post } from "../modal/ApiResponsModal";

const Search = (props: any) => {

    const filterPosts = (query: string) => {
        if (!query) {
            // props.getSearchResults([]);
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = props.posts.filter((post: Post) =>
                post.title.toLowerCase().includes(lowerCaseQuery) ||
                post.body.toLowerCase().includes(lowerCaseQuery)
            );
            props.getSearchResults(filtered);
        }
    };


    return (
        <div className="relative md:w-1/2">
            <input
                className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Search..."
                onChange={(e) => filterPosts(e.target.value)}
            />
           

            <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
                </svg>
            </div>
        </div>
    )
}
export default Search;