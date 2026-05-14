import { Response } from 'express';
import { CropNFT } from '../models/CropNFT';
import { Transaction } from '../models/Transaction';
import { User } from '../models/User';
import { AuthenticatedRequest } from '../middleware/auth';

export const getDashboardSummary = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const role = req.user?.role;

  const [cropsCount, transactionCount, farmerCount, consumerCount] = await Promise.all([
    CropNFT.countDocuments(role === 'farmer' ? { farmer: userId } : {}),
    Transaction.countDocuments(role === 'farmer' ? { user: userId } : {}),
    User.countDocuments({ role: 'farmer' }),
    User.countDocuments({ role: 'consumer' }),
  ]);

  const recentCrops = await CropNFT.find(role === 'farmer' ? { farmer: userId } : {})
    .sort({ createdAt: -1 })
    .limit(6)
    .populate('farmer', 'name farmName location walletAddress');

  res.json({
    success: true,
    data: {
      cropsCount,
      transactionCount,
      farmerCount,
      consumerCount,
      recentCrops,
    },
  });
};
