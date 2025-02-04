import { Card, CardContent, Typography, Avatar } from "@mui/material";

const UserCard = ({ user }: { user: { userName: string; email: string; } }) => {

    const userCardStyles = {
        cardContainer: {
            maxWidth: 345,
            textAlign: "center",
        },
        cardAvatar: {
            width: 80,
            height: 80,
            margin: "auto",
        }
    }
    return (
        <Card sx={userCardStyles.cardContainer}>
        <CardContent>
            <Avatar src="/static/user.png" alt={user.userName} sx={userCardStyles.cardAvatar} />
            <Typography variant="h6" mt={2}>{user.userName}</Typography>
            <Typography variant="body2" color="textSecondary">{user.email}</Typography>
        </CardContent>
        </Card>
    );
};

export default UserCard;