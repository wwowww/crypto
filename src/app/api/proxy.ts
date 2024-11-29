import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}`,
      {
        params: {
          vs_currency: 'KRW',
          order: 'gecko_desc',
          per_page: 10,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h',
        },
      }
    )
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.message || '500 Error',
    });
  }
}