�}F� r �!  �y�J�)��a	���#_�����u���`pT)ϥ}T;��1	�7��o�XbHj̇@�&���y|?�R�z��.'&��o=�"���T|3��G/��s{}�@X~�l���$x��=h���ڋ��|�fB	s��N�CJ�u���+��$kD�F�muJ�	����v��N$�|V�*��/�zJ�ΝM��<�]���>�X��X�=r��9����k6|9���e1�qŴ?��L��b���Lźp�"��ʡp��8v��%�/��1f�A�����D͌�/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�mend(int PA_ID)
        {
            object objType = new DataAccess().CreateObject("PicRelationRecommendDAL");//创建PicRelationRecommendDAL的实例
            return objType == null ? new List<PicRelationRecommendModel>() : ((IPicRelationRecommendDAL)objType).GetPicRelationRecommend(PA_ID);
        }
        #endregion
    }
}
