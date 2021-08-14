const searchHandler = async (event) => {
    event.preventDefault();
    //not sure what to do here
    console.log("Search button works");
   
  };
  $(".search-btn").on("submit", searchHandler);

const historyHandler = async (event) => {
    event.preventDefault();
    //not sure what to do here
    console.log("History button works");
  };
  $(".history-btn").on("submit", historyHandler);

  const instructionHandler = async (event) => {
    event.preventDefault();
    //not sure what to do here
    console.log("Instruction button works")
  };
  $(".instruction-btn").on("submit", instructionHandler);

  const playComputerHandler = async (event) => {
    event.preventDefault();
    //not sure what to do here
    console.log("Play Computer button works")
  };
  $(".play-computer-btn").on("submit", playComputerHandler);


  const playFriendHandler = async (event) => {
    event.preventDefault();
    //not sure what to do here
    console.log("Play Freind button works")
  };
  $(".play-friend-btn").on("submit", playFriendHandler);

  const favoriteHandler = async (event) => {
    event.preventDefault();
    //not sure what to do here
    console.log("Favorite Button Works")
  };
  $(".favorite-btn").on("submit", favoriteHandler);
