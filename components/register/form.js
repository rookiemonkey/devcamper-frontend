const RegisterForm = () => {
    return (
        <section class="form mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 m-auto">
                        <div class="card bg-white p-4 mb-4">
                            <div class="card-body">
                                <h1><i class="fas fa-user-plus"></i> Register</h1>
                                <p>
                                    Register to list your bootcamp or rate, review and favorite
                                    bootcamps
								</p>
                                <form>
                                    <div class="form-group">
                                        <label for="name">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            class="form-control"
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </div>
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
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            class="form-control"
                                            placeholder="Enter password"
                                            required
                                        />
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="password2">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="password2"
                                            class="form-control"
                                            placeholder="Confirm password"
                                            required
                                        />
                                    </div>

                                    <div class="card card-body mb-3">
                                        <h5>User Role</h5>
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="role"
                                                value="user"
                                                checked
                                            />
                                            <label class="form-check-label">
                                                Regular User (Browse, Write reviews, etc)
											</label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="role"
                                                value="publisher"
                                            />
                                            <label class="form-check-label">
                                                Bootcamp Publisher
											</label>
                                        </div>
                                    </div>
                                    <p class="text-danger">
                                        * You must be affiliated with the bootcamp in some way in
                                        order to add it to DevCamper.
									</p>
                                    <div class="form-group">
                                        <input
                                            type="submit"
                                            value="Register"
                                            class="btn btn-primary btn-block"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterForm;