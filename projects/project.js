let theme = localStorage.getItem("theme");

if (theme == null) {
    setTheme("blue");
} else {
    setTheme(theme);
}
