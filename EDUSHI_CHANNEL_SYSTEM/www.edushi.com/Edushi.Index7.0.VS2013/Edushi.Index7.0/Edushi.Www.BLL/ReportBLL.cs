�}�� r g	  %µT�s�9��a	��� ��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'�^L��;�Um,�Y���a �!'�
��� U�T��t����H�GA�5#�b)R����,h����E�%&�
�h]f�iL�n��	��i�eڛ�@o�#�OO�J�e)�Z;I]�3PȌ�Q ��2�S�8S�֝]l���C�|��#��fn�N7���e8F��[�)�6��CY�i�b#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�
        /// <param name="ert_ip"></param>
        /// <returns></returns>
        public int AddReport(string ert_url, string ert_type, string ert_phone, string ert_name, string ert_Remarks, string ert_ip)
        {
            return new ReportDAL().AddReport(ert_url, ert_type, ert_phone, ert_name, ert_Remarks, ert_ip);
        }
        #endregion
    }
}
