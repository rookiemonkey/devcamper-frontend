import Link from 'next/link'
import formatPrice from '../../utilities/formatPrice';

const BootcampCard = props => {
    const { bootcamp } = props;

    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img
                        src={`${process.env.NEXT_PUBLIC_IMG_SRC}/${bootcamp.photo}`}
                        className="card-img"
                        alt={bootcamp.name}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link href={`/bootcamp/${bootcamp._id}`}>
                                <a>
                                    {bootcamp.name}

                                    <span className="float-right badge badge-success"
                                    >{bootcamp.averageRating}</span>
                                </a>
                            </Link>
                        </h5>
                        <span className="badge badge-dark mb-2">
                            {bootcamp.location.formattedAddress}
                        </span>
                        <p className="card-text">
                            {
                                bootcamp.careers.map((career, ind) => (
                                    <span key={ind}>
                                        {`${career}, `}
                                    </span>
                                ))
                            }
                        </p>

                        <small
                            className="float-right"
                            style={{ position: 'relative', bottom: '15px' }}
                        ><i className="fas fa-money-bill-wave-alt text-success"></i> &nbsp;
                        ${formatPrice(bootcamp.averageCost)} (Average)</small>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BootcampCard;