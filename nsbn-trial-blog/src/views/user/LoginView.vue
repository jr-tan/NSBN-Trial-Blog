<template>
    <div class="container">

            <form method="post">
                <div asp-validation-summary="All" class="text-danger"></div>

                <div>
                    <label class="col-sm-2 col-form-label">Email:</label>
                    <input asp-for="MyUser.Email" />
                    <span asp-validation-for="MyUser.Email" class="text-danger"></span>
                </div>

                <div>
                    <label class="col-sm-2 col-form-label">Password:</label>
                    <input asp-for="MyUser.Password" />
                    <span asp-validation-for="MyUser.Password" class="text-danger"></span>

                </div>

                <div class="col-sm-10">
                    <input id="login" type="submit" value="Login" class="btn btn-primary" />
                </div>
            </form>

        </div>
</template>