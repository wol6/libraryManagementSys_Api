import { bookModel } from "../../schema/books/books.js";
import { userModel } from "../../schema/user/user.js";

export const dashboardOvrView = async (req, res) => {
    try {
        const bookTotalCount = await bookModel.estimatedDocumentCount();
        const userCount = await userModel.estimatedDocumentCount();
        const bookAvlCount = await bookModel.countDocuments({ availabilityStatus: true });
        const bookReturnCount = await bookModel.countDocuments({ availabilityStatus: false });

        return res.json({
            success:true,
            bookTotalCount,
            userCount,
            bookAvlCount,
            bookReturnCount
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Server Error" });
    }
};
