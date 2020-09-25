const PasswordResetForm = () => {

    return (
        <section class="container mt-5">
            <div class="row">
                <div class="col-md-8 m-auto">
                    <div class="card bg-white py-2 px-4">
                        <div class="card-body">
                            <a href="login.html">Back to login</a>
                            <h1 class="mb-2">Reset Password</h1>
                            <p>	Use this form to reset your password using the registered email address.</p>
                            <form>
                                <div class="form-group">
                                    <label>Enter Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        class="form-control"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        type="submit"
                                        value="Reset Password"
                                        class="btn btn-dark btn-block"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default PasswordResetForm;