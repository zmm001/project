�}n� r �  ;�n�����a	��2��_<��}���qx��Qi���5>yR�УL�]�j�Nn�$_c�69b�$�|�~iǠ8/p���}?P�S���z��:�*�����y�:�P��#��z�P��[
:�b��p>��,��T�ݼ�"h�ٺ�|���3>�&�U*�Y�=��턭W���hb��.�<^����.@_�����;��O��[���`�"ˡP@�;E`G߹�m��NUL~!v�_�xSG�̋|�=�ۏ�i&`+�������	 �H^UW;l�?�����L��jX�":��چ���s*��Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:��边页卡同城的数据
        /// </summary>
        /// <param name="sCityCode">cityCode</param>
        /// <returns></returns>
        public DataTable GetChengRecommendData(string sCityCode)
        {
            string strSql = string.Format(@"Proc_GetMapIndex");

            this.ClearParameter();
            this.AddParameter("citycode", sCityCode);
            return this.FillDataTable(strSql, CommandType.StoredProcedure);
        }
    }
}
