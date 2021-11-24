console.log("Hello");

/**
 *
 * without arrow function
 */

const event = {
  name: "Happy birthday",
  guestList: ["Alamin", "sheikh", "Anindita"],
  printGuest() {
    const that = this;
    console.log("Hello " + this.name);
    this.guestList.forEach(function (guest) {
      console.log(guest + " is attending." + that.name);
    });
  },
};

event.printGuest();

/**
 * with arrow function
 */
const event1 = {
  name: "Happy birthday",
  guestList: ["Alamin", "sheikh", "Anindita"],
  printGuest() {
    console.log("Hello " + this.name);
    this.guestList.forEach((guest) => {
      console.log(guest + " is attending." + this.name);
    });
  },
};

event1.printGuest();
