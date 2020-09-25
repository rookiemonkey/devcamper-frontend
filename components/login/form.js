const LoginForm = () => {

    return (
        <section class="form mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 m-auto">
                        <div class="card bg-white p-4 mb-4">
                            <div class="card-body">
                                <h1><i class="fas fa-sign-in-alt"></i> Login</h1>
                                <p>
                                    Log in to list your bootcamp or rate, review and favorite
                                    bootcamps
								</p>
                                <form>
                                    <div class="form-group">
                                        <label for="email">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            class="form-control"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            class="form-control"
                                            placeholder="Enter password"
                                            required
                                        />
                                    </div>
                                    <div class="form-group">
                                        <input
                                            type="submit"
                                            value="Login"
                                            class="btn btn-primary btn-block"
                                        />
                                    </div>
                                </form>
                                <p>	Forgot Password? <a href="/password_reset">Reset Password</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm;