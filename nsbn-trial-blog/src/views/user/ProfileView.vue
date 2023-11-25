<template>
    <div class="container">
                <div class="portfolio-info">
                    <h3>@Model.MyUser.Name</h3>
                    <ul style="list-style: none;">
                        <li>Email: @Model.MyUser.Email</li>
                        <li>Phone Number: @Model.MyUser.UserPhoneNum</li>
                        <li>Date of Birth: @Model.MyUser.UserDOB</li>
                    </ul>
                </div>
                <a class="btn btn-primary">Update/Edit</a>
            </div>
</template>