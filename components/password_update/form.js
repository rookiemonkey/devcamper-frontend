const PasswordUpdateForm = () => {

    return (
        <section class="container mt-5">
            <div class="row">
                <div class="col-md-8 m-auto">
                    <div class="card bg-white py-2 px-4">
                        <div class="card-body">
                            <h1 class="mb-2">Update Password</h1>
                            <form>
                                <div class="form-group">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        class="form-control"
                                        placeholder="Current Password"
                                    />
                                </div>
                                <div class="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        class="form-control"
                                        placeholder="New Password"
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword2"
                                        class="form-control"
                                        placeholder="Confirm New Password"
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        type="submit"
                                        value="Update Password"
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

export default PasswordUpdateForm;