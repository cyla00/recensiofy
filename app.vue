<template>
    <div class="main">
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
</template>

<style>
:root{
    --c-light: #FCF9F5;
    --c-dark: #3B444B;
    --c-green: #02DF9C;
    --c-blue: #096CFF;
    --c-border: #7B848B;
}
html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
	font-family: Inter;
}
body{
    margin: 0;
    padding: 0;
    color: #3B444B;
}
i {
	vertical-align: middle;
}
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 150ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.back-shadow{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.link-effect:hover, .desktop-btn:hover{
    opacity: 50%;
}
.link-effect:active, .desktop-btn:active{
    opacity: 100%;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background-image: linear-gradient(to right bottom, #02df9c, #00cecd, #00b7fc, #0099ff, #096cff);
}

</style>