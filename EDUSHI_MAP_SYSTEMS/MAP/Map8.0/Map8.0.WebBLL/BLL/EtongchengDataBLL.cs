�}/� r �  ��^Y��9���a	����px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'�\XƦ7{� �HS��n�̔�,'�HzhO�STJV�5�k�M�2������4����:�!%�u�4m}���/3W���Ǔop��0՟�b�o��Ra�����\�}t��?�@ ����|p�B�\����ݠ��1K��L�-���ǎ�gaEo#���S�8c���.�W��j�t��n3�o���6��E�:Ř`���%�1ɳS��Y�6t �6�%�<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�itycode"></param>
        /// <returns></returns>
        public DataTable GetChengRecommendData(string citycode) {
            string _CahceKey = "PageCardBTDDataKey" + citycode;
            return WebCachesHelper.GetCacheObject(_CahceKey, delegate()
            {
                return dal.GetChengRecommendData(citycode);
            }, new TimeSpan(0, 0, WebGlobalConfig.PageCardDataCacheTime, 0, 0)) as DataTable;   
        }
    }
}
