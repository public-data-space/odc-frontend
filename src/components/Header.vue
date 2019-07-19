<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href=".">
                <img src="../assets/images/ids-white.png" alt="Logo of Industrial data space" class="navbar-logo" style="width: auto; height: 50px;">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link> 
                    </li>
                    <li class="nav-item">
                        <router-link to="/dataasset" class="nav-link">Data Assets</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/datasource/select" class="nav-link">Hinzufügen</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/job" class="nav-link">Jobs</router-link>
                    </li>
                    <li class="nav-item">
                       <router-link to="/about" class="nav-link">Connector</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Logout</router-link>
                    </li>
                </ul>

            </div>
        </nav>
    </header>
</template>