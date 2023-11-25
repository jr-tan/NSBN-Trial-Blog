<template>
    <div class="container">

            <form method="post">
                <div asp-validation-summary="All" class="text-danger"></div>

                <div class="form-group">
                    <label for="name">Tile</label>
                    <input type="text" class="form-control" v-model = "ttileInput" required>
                </div>

                <div class="form-group">
                    <label for="name">Description</label>
                    <textarea v-model = "descriptionInput" class="form-control"></textarea>

                </div>
                
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>

        </div>
</template>