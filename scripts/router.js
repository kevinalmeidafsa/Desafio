export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }
  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    const buttons = document.querySelectorAll("nav a");

    buttons.forEach((button) => {
      button.getAttribute("href") === pathname
        ? button.classList.add("active")
        : button.classList.remove("active");
    });

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.getElementById("app").innerHTML = html;
      });
  }
}
