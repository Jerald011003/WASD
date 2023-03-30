import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFriends, addFriend } from '../actions/friendlistActions';

const FriendList = () => {
  const friends = useSelector(state => state.friendList.friends || []);
  const { loading, error, friend } = friends || {}; // Add a default value for friends object
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const handleAddFriend = (e) => {
    e.preventDefault();
    const friendId = parseInt(e.target.elements.friendId.value);
    dispatch(addFriend(friendId));
    e.target.reset();
  };

  return (
    <div>
      <h2>Friend List</h2>
      <ul>
      {friends && friends.map(friend => (
          <li key={friend.id}>{friend.username}</li>
        ))}
      </ul>
      <form onSubmit={handleAddFriend}>
        <label htmlFor="friendId">Add Friend:</label>
        <input type="text" name="friendId" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};


export default FriendList;
