�}+� r ^  ��� C�x��a	��W��_���}�n��S
���爭aA�Cyqp��%��G��~��u���ۍ\3�Sw	46��k�ٷ���&K�m�K}�5[S���+��gI�`�=�t�k��^��9\�ں�jj��\ԕ�^�J5抨]�5:��_M��� ���j�T2f�������&%c�Ee#Λm���j �̋����r@��)/����_<��$���I�X4IVR6�Z�Z+�*q��C�{�y�x�+:�Xg�\M�����&u��sו���}�bŰ����c�x֋�I{��Gm�,"{���Q����܅��w}�Vo�Rfuޤh���6o�S��.7�.�O�hh�;Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�%�U-ې�awEE��2��:B�^n�+���K�aƅ�@>����{����T-]��~�p�J��ݓ��(���-���fw����%)�S����c�C�_ן�N�oZ��S�4�� KA�$4�m&�<�!����"���4X��xx����nݧ~�ujDd��}���5C����R��=92Xh�E��LȄ6%Wo%�y��|�����4b��-A�V������p�Vz�/�9(�t�a��f8gmty�T $�,�*���,�J1�M���R�D�
w��!�0�S��=�U�� W�!�B�{S���6���ჹm��?��"���(]���$�+IŐ��H�����"k3��Ţ�<�cb΀>�{�[ ��Eij}f��Am�[�.��[�����f��_��-p���B�Zy�/�1 �̯	t��D�ힻɺ���^}	�VE�Ψr�/)�M��}�>-(�����#R��N��Q�)`��0�i\�l'��a�;���w+D��_]�Z�In��)���,�pd�o���ab�ˆ}X��B��&���\=�<O��ؽ)$]��T���僩~y���2ʖ�#���*��(0><>~$&t	�e ����#����<�sؠ��+�1��4*$t���z�%�َ�;�rΜ���0��Z҈�j"hc�"+�ɕ�P9�K��<���[b���S&w�Q!�)�3�xۋ�S�R]��K^����%G[� ����9��4b$\���(���W�<��ɣ2���41s ML�SO�!��?Dr0�CH�U,El���m��nO��0=c�<󻙴ăP�/0ήv̰��6�i��>>JF��C���DJSۂ�
���v?������A!�x֗��õ,�.�H�+��tӢ��*?��w7��{Hk�2�X���?s=�j]�n�!6�"�9B�&���EC���z'�=Z�)D[宇qx�
��!��v���&�Ft�Ʊ׸��v���xo">The member.</param>
        /// <returns>An Id generator.</returns>
        public IIdGenerator GetIdGenerator(MemberInfo memberInfo)
        {
            return BsonSerializer.LookupIdGenerator(BsonClassMap.GetMemberInfoType(memberInfo));
        }
    }
}
