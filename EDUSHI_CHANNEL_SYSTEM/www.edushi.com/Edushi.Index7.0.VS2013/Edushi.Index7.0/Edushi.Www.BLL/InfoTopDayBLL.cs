�}m� r ^	  �B��1���a	��(��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'�^L��;�Um,�Ym���� +�
����]ҧ���ǳ#�JA.Jj�ac:��'��vf��[*[���������u���Uv�r���6s9�������y1e�ׁ_�����I�����,�� *f�����`�;��GU?����jI��5_h1jN�3�I!��
�w%Q�фQ�-�uO����s��{���S95 F�̅�#�[��<и^��@��c^i��!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�ID则为0</param>
        /// <param name="ITID">子分类ID，若是子分类的今日头条，则传入子分类ID，父分类ID则为0</param>
        /// <param name="topNum">数量</param>
        /// <returns></returns>
        public List<InfoTopDayModel> GetTopDayData(string sCityCode, int ParentITID, int ITID, int topNum)
        {
            return new InfoTopDayDAL().GetTopDayData(sCityCode, ParentITID, ITID, topNum);
        }
        #endregion
    }
}
