�}� r ]	  G� ������a	��4��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'�^L��;�Um,�Ym���� +�
����]ҧ���ǳ#�JA.Jj�ac:��'��v�+��^�3��4tˮ,���aߠ�c��ͦ�!��I)�D<��J-�Y���n�*��#�x���-�պ�/��"�M�n%�&��z: B��=#p�\r���d��z�����/�-��5/����=���Q�v_~��2)��L��8$���aR~r�������I�4��'��^JK2��y�x��%��^X����{�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�param>
        /// <param name="ITID">子分类ID，若是子分类的今日头条，则传入子分类ID，父分类ID则为0</param>
        /// <param name="topNum">数量</param>
        /// <returns></returns>
        public List<InfoSubjectModel> GetSubjectData(string sCityCode, int ParentITID, int ITID, int topNum)
        {
            return new InfoSubjectDAL().GetSubjectData(sCityCode, ParentITID, ITID, topNum);
        }
        #endregion
    }
}
