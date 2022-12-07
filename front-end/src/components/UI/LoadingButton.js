import { Button, Spinner } from "reactstrap"

const LoadingButton = ({loading,disabled,addons,clicked,children}) => {
    return (
        <Button
            onClick={clicked}
            {...addons}
            disabled={loading || disabled}
        >
            {loading && (
                <>
                    <Spinner size="sm">
                        Loading...
                    </Spinner>
                    <span>
                        Loading
                    </span>
                </>
            )}
            {!loading && children}
        </Button>
    )
}

export default LoadingButton