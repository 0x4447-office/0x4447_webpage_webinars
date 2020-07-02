<template>
  <img class="mx-auto CompanyLogo" src="/company_logo_rectangle.svg" id="home_header_logo" alt="logo" />
</template>
<style>
.CompanyLogo {
  animation: 1s appear;
  margin: auto;
  height: 200px;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
