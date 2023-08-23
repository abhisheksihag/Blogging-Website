import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';

const FollowButton = ({ authorId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Check if the author is already followed in local storage
    const storedFollowStatus = localStorage.getItem(`followStatus_${authorId}`);
    if (storedFollowStatus) {
      setIsFollowing(JSON.parse(storedFollowStatus));
    }
  }, [authorId]);

  const handleFollowToggle = () => {
    const newFollowStatus = !isFollowing;
    setIsFollowing(newFollowStatus);
    
    // Update follow status in local storage
    localStorage.setItem(`followStatus_${authorId}`, JSON.stringify(newFollowStatus));
  };

  return (
    <Button
      onClick={handleFollowToggle}
      colorScheme={isFollowing ? 'red' : 'teal'}
      size="sm"
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
