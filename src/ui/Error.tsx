const Error = (props: any) => {
    return (
        <>
            {typeof(props.errorValue) === 'string' ? 
            (
                <p className="flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20 mb-4">
                    {props.errorValue}
                </p>
            ) : 
            (
                Object.keys(props.errorValue).map((err: any)=>{
                   return (
                       <p className="flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20 mb-4" key={err}>
                           {props.errorValue[err]}
                       </p>
                   )}
            )
            )}
        </>
    )
}
export default Error;
