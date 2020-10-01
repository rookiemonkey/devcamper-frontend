import Link from 'next/link';

const ManageBootcampsNone = () => {

    return (
        <React.Fragment>
            <p className="lead">
                You have not yet added a bootcamp
            </p>
            <Link href={`/bootcamp/add`}>
                <a
                    className="btn btn-primary btn-block"
                >Add Bootcamp</a>
            </Link>
        </React.Fragment>
    )
}

export default ManageBootcampsNone;