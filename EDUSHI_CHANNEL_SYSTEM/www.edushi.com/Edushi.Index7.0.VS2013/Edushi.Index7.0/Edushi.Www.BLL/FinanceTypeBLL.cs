�}� r W	  e�F3�����a	���#@���}���f�
���� 
��6a&2�kb�|p�����h���x<�}���;��$'��eS�^A��[��`P�|5 �x����(��H�^�	�4$��fi��sdb\v6<9[��0�J!� 8U�z�"��A�=fy��CP�����r�8r�sd�n�<E���
����F�c� ��Ȟ��d����˧�H���V��i^S0�y��e=��?�м0�ڹ���FF���Llfg�a����2p�\��i�f�T�ox$w\+{���K>� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�// <returns></returns>
        public List<FinanceTypeModel> getAllFinanceType()
        {
            return CacheConfigHelper.GetDataFromCache(DataEnum.PcWwwCache.AllFinanceTypeCache, (ccm) => { return ccm.CacheKey; }, () =>
            {
                return new FinanceTypeDAL().getAllFinanceType();

            }) as List<FinanceTypeModel>;

        }
        #endregion
    }
}
